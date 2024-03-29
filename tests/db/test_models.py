import datetime
from uuid import UUID
from databases import Database
from fastapi import FastAPI
import ormar
import pytest

from kitman.db import models, mixins
from kitman import exceptions


class MyModel(models.BaseModel):
    class Meta(models.BaseMeta):
        pass


class MyOrderableModel(models.BaseModel, mixins.OrderableMixin):
    class Meta(models.BaseMeta, mixins.OrderableMixin.MetaOptions):
        pass


# Queryset


async def test_base_queryset(db: Database):

    with pytest.raises(exceptions.NotFound):

        await MyModel.objects.get_or_404(id="bla")

    instance = await MyModel.objects.create()

    assert (
        await MyModel.objects.get(id=instance.id) == instance
    ), "get_or_404 could not find item"


# Base Model
async def test_models(app: FastAPI, db: Database):

    instance = await MyModel.objects.create()

    assert str(instance) == f"{instance.__class__.__name__} with ID: {instance.id}"

    assert isinstance(instance.id, UUID), "Model id is not a uuid4"

    assert isinstance(
        instance.created, datetime.datetime
    ), "Model created is not a datetime"
    assert isinstance(
        instance.updated, datetime.datetime
    ), "Model updated is not a datetime"

    # Test updated changes when updated instance
    pre_updated = instance.updated
    await instance.update()

    assert instance.updated != pre_updated, "Model updated field is not updated"


# Mixins
async def test_orderable_mixin(app: FastAPI, db: Database):

    assert MyOrderableModel.Meta.orders_by == [
        "order",
    ], "OrderableMixin does not have orders_by set"

    instance = await MyOrderableModel.objects.create()

    assert instance.order == 1, "order default is not 1"

    instance_3 = await MyOrderableModel.objects.create(order=3)
    instance_2 = await MyOrderableModel.objects.create(order=2)

    instances = await MyOrderableModel.objects.all()

    assert [i.id for i in instances] == [
        instance.id,
        instance_2.id,
        instance_3.id,
    ], "Models are not ordered"
