from datetime import datetime, timedelta
from typing import List, Optional

from db.mongo.mongo_model import OID, MongoModel
from pydantic import BaseModel, Field


class JobCreateBaseModel(MongoModel):
    job_code: str
    job_name: str
    taker_code: str
    taker_name: str
    description: str
    storage_id: str
    req_memory: int
    req_cores: int
    req_bandwidth: int
    req_server_time: int
    assigned_to: Optional[str] = None
    is_open: Optional[bool] = True
    is_completed: Optional[bool] = False
    result_storage_id: Optional[str] = None

class JobCreateModel(JobCreateBaseModel):
    ill_defined_reports: Optional[int] = 0
    created_by: Optional[str] = None
    created_at : datetime = datetime.now()
    is_updated : Optional[bool] = False
    updated_at : Optional[datetime] = None
    is_deleted : Optional[bool] = False
    deleted_at : Optional[datetime] = None

class JobModelOut(JobCreateModel):
    id: OID = Field()