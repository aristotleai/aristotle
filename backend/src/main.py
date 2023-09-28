import logging

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from users.routers import (
    users,
    register,
    login
)

from projects.routers import (
    jobs,
    providers,
    servers,
    takers
)

from db.mongo.mongo_adaptor import (
    close_mongo_connection,
    connect_to_mongo
)

from master.routers import (
    app_info,
    ui_info,
    healthcheck,
    rootcheck
)

app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)

origins = [
    "http://localhost:*",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "DELETE", "PUT"],
    allow_headers=[
        "x-requested-with",
        "Content-Type",
        "origin",
        "authorization",
        "accept",
        "client-security-token",
    ],
)

app.add_event_handler("startup", connect_to_mongo)
app.add_event_handler("shutdown", close_mongo_connection)

# MASTER ROUTERS
app.include_router(app_info.router, tags=["App Info"])
app.include_router(ui_info.router, tags=["UI Info"])
app.include_router(healthcheck.router, tags=["Health Check"])
app.include_router(rootcheck.router, tags=["RootCheck"])

# USERS ROUTERS
app.include_router(register.router, tags=["Register"])
app.include_router(users.router, tags=["Users"])

# LOGIN ROUTERS
app.include_router(login.router, tags=["Login"])

# PROJECTS ROUTERS
app.include_router(providers.router, tags=["Providers"])
app.include_router(jobs.router, tags=["Jobs"])
app.include_router(servers.router, tags=["Servers"])
app.include_router(takers.router, tags=["Takers"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
