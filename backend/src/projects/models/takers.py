from datetime import datetime
from typing import List, Optional

from db.mongo.mongo_model import OID, MongoModel
from pydantic import BaseModel, Field


class TakerCreateBaseModel(MongoModel):
    taker_code: str
    taker_name: str

class TakerCreateModel(TakerCreateBaseModel):
    funded_jobs: Optional[int] = 0
    is_active: Optional[bool] = True
    created_at : datetime = datetime.now()
    is_updated : Optional[bool] = False
    updated_at : Optional[datetime] = None
    is_deleted : Optional[bool] = False
    deleted_at : Optional[datetime] = None

class TakerModelOut(TakerCreateModel):
    id: OID = Field()