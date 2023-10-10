from datetime import datetime
from typing import List, Optional

from db.mongo.mongo_model import OID, MongoModel
from pydantic import BaseModel, Field


class ProviderCreateBaseModel(MongoModel):
    provider_name: str

class ProviderCreateModel(ProviderCreateBaseModel):
    provider_code: str
    completed_jobs: Optional[int] = 0
    is_active: Optional[bool] = True
    created_at : datetime = datetime.now()
    is_updated : Optional[bool] = False
    updated_at : Optional[datetime] = None
    is_deleted : Optional[bool] = False
    deleted_at : Optional[datetime] = None

class ProviderModelOut(ProviderCreateModel):
    id: OID = Field()