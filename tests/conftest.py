import sys
import databases
import pytest
from httpx import AsyncClient
import sqlalchemy
from fastapi import FastAPI
from saas_toolkit import configure, SETTINGS
from saas_toolkit.config import Settings


test_settings = Settings()

configure(test_settings)

# Configuration
@pytest.fixture(scope="module", autouse=True)
def configuration():

    configure(Settings())

    yield

    # Reset configuration
    configure(test_settings)


# App
@pytest.fixture(scope="module")
def app() -> FastAPI:

    return FastAPI()


# Database
DATABASE_URL = "sqlite:///db.sqlite"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()


@pytest.fixture(scope="module")
async def db():

    configure(Settings(sql=dict(metadata=metadata, database=database)))

    engine = sqlalchemy.create_engine(DATABASE_URL)
    metadata.drop_all(engine)
    metadata.create_all(engine)
    yield
    metadata.drop_all(engine)
    configure(test_settings)


# Client
@pytest.fixture(scope="module")
async def client():
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
