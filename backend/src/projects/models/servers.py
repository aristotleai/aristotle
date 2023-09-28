from datetime import datetime, timedelta
from typing import List, Optional

from db.mongo.mongo_model import OID, MongoModel
from pydantic import BaseModel, Field


class ServerCreateBaseModel(MongoModel):
    server_code: str
    provider_code: str
    provider_name: str
    memory_gb: int
    num_cores: int
    bandwidth_gbps: int
    usage_fee: int
    is_available: bool

class ServerCreateModel(ServerCreateBaseModel):
    created_by: Optional[str] = None
    created_at : datetime = datetime.now()
    is_updated : Optional[bool] = False
    updated_at : Optional[datetime] = None
    is_deleted : Optional[bool] = False
    deleted_at : Optional[datetime] = None

class ServerModelOut(ServerCreateModel):
    id: OID = Field()