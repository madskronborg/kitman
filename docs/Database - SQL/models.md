# Models

See an overview of utility models to easily and consitently solve common data problems.

## BaseModel

The `BaseModel` is the primary class, which should _always_ be subclassed. <br>
It implements the minimum required fields for a consistent data model.

**Fields** <br>

- id (UUID4) -> The primary key field
- created (datetime) -> A `datetime` for when the instance was created
- updated (datetime) -> A `datetime` for when the instance was updated

**Example**

```py
import ormar
from kitman.db import models

class MyModel(models.BaseModel):

    class Meta(models.BaseMeta):
        pass

```

## OrderableMixin

Implements a simple ordering mechanism. <br>
Whenever you use `Model.objects.filter` or the like, the instances will now be returned in the desired order.

**Fields** <br>

- order (SmallInteger, default = 1) -> A SmallInteger where a lower value will order an item closer to the start of the list, where `1` will put the item in the very start of the list. There can be multiple items with the same `order` value.

**Meta** <br>
Implements `orders_by` which is set to `["order"]`

**Example**

```py

import ormar
from kitman.db import models, mixins

class MyOrderableModel(models.BaseModel, mixins.OrderableMixin):

    class Meta(models.BaseMeta, mixins.OrderableMixin.MetaOptions):
        pass
```
