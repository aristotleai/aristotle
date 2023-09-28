import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Security
from users.utils.authentication_user import get_current_active_user
from ..crud.providers import ProviderCollection
from ..models.providers import (
    ProviderCreateBaseModel
)

router = APIRouter()


@router.post(
    "/v1/providers/create_provider",
    dependencies=[Security(get_current_active_user, scopes=["admin:write"])],
)
async def create_provider(
    provider_details: ProviderCreateBaseModel
):
    try:
        provider_collection = ProviderCollection()
        insert_id = await provider_collection.create_provider(provider_details=provider_details)

        return { "InternalResponseCode": 0, "Message": "provider successfully created", "data": str(insert_id) } if insert_id else { "InternalResponseCode": 1, "Message": "provider not created", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.post(
    "/v1/providers/delete_provider",
    dependencies=[Security(get_current_active_user, scopes=["admin:write"])],
)
async def delete_provider(
    provider_code: str
):
    try:
        provider_collection = ProviderCollection()
        provider_id = await provider_collection.delete_provider(provider_code=provider_code)

        return { "InternalResponseCode": 0, "Message": "provider successfully disabled", "data": provider_id } if provider_id else { "InternalResponseCode": 1, "Message": "provider not disabled", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/providers/get_provider_by_code",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_provider_by_code(
    provider_code: str
):
    try:
        provider_collection = ProviderCollection()
        provider_data = await provider_collection.get_provider_by_code(provider_code=provider_code)
                                                        
        return { "InternalResponseCode": 0, "Message": "provider", "data": provider_data } if provider_data is not None else { "InternalResponseCode": 1, "Message": "provider not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.get(
    "/v1/providers/get_all_providers",
    dependencies=[Security(get_current_active_user, scopes=["guest:read"])],
)
async def get_all_providers():
    try:
        provider_collection = ProviderCollection()
        provider_list = await provider_collection.get_all_providers()
                                                        
        return { "InternalResponseCode": 0, "Message": "providers fetched", "data": provider_list } if provider_list is not None else { "InternalResponseCode": 1, "Message": "providers not fetched", "data": None }

    except Exception:
        raise HTTPException(status_code=500, detail="Something went wrong")