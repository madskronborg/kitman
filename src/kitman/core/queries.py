from typing import TYPE_CHECKING, Any, TypeVar
from uuid import uuid4
from pydantic import BaseModel, Field, UUID4
from kitman.core.events import DomainEvent
from multimethod import multimeta

if TYPE_CHECKING:
    from kitman import Kitman


class Query(BaseModel):
    id: UUID4 = Field(default_factory=uuid4)


class QueryHandler(metaclass=multimeta):

    kitman: "Kitman"

    async def handle(self, message: BaseModel) -> Any:
        ...

    async def emit(self, event: DomainEvent):

        await self.kitman.emit(event)


TQueryHandler = TypeVar("TQueryHandler", bound=QueryHandler)