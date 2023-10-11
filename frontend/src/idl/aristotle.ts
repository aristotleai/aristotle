export type Aristotle = {
    "version": "0.1.0",
    "name": "aristotle",
    "instructions": [
      {
        "name": "createProvider",
        "accounts": [
          {
            "name": "provider",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "name": "createTaker",
        "accounts": [
          {
            "name": "taker",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "name": "listServer",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "serverId",
            "type": "u64"
          },
          {
            "name": "memoryGb",
            "type": "u8"
          },
          {
            "name": "numCores",
            "type": "u8"
          },
          {
            "name": "bandwidthGbps",
            "type": "u32"
          },
          {
            "name": "usageFee",
            "type": "u64"
          }
        ]
      },
      {
        "name": "delistServer",
        "accounts": [
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "markServerAvailable",
        "accounts": [
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "isAvailable",
            "type": "bool"
          }
        ]
      },
      {
        "name": "createJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "jobId",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "storageId",
            "type": "string"
          },
          {
            "name": "reqMemory",
            "type": "u32"
          },
          {
            "name": "reqCores",
            "type": "u8"
          },
          {
            "name": "reqBandwidth",
            "type": "u32"
          },
          {
            "name": "reqServerTime",
            "type": "u32"
          }
        ]
      },
      {
        "name": "cancelJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "assignJob",
        "accounts": [
          {
            "name": "takerAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "markJobAbandoned",
        "accounts": [
          {
            "name": "takerAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "markJobCompleted",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "resultStorageId",
            "type": "string"
          }
        ]
      },
      {
        "name": "reportJobIllDefined",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "verifyCompletedJob",
        "accounts": [
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "providerReceiveAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "rejectCompletedJob",
        "accounts": [
          {
            "name": "takerAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "Escrow",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "serverUser",
              "type": "publicKey"
            },
            {
              "name": "serverUserToken",
              "type": "publicKey"
            },
            {
              "name": "usageFee",
              "type": "u64"
            },
            {
              "name": "seed",
              "type": "u64"
            },
            {
              "name": "authBump",
              "type": "u8"
            },
            {
              "name": "vaultBump",
              "type": "u8"
            },
            {
              "name": "escrowBump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Job",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "jobId",
              "type": "u64"
            },
            {
              "name": "addedBy",
              "type": "publicKey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "storageId",
              "type": "string"
            },
            {
              "name": "reqMemory",
              "type": "u32"
            },
            {
              "name": "reqCores",
              "type": "u8"
            },
            {
              "name": "reqBandwidth",
              "type": "u32"
            },
            {
              "name": "reqServerTime",
              "type": "u32"
            },
            {
              "name": "assignedTo",
              "type": {
                "option": "publicKey"
              }
            },
            {
              "name": "isOpen",
              "type": "bool"
            },
            {
              "name": "isActive",
              "type": "bool"
            },
            {
              "name": "isCompleted",
              "type": "bool"
            },
            {
              "name": "resultStorageId",
              "type": {
                "option": "string"
              }
            },
            {
              "name": "illDefinedReports",
              "type": "u32"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Provider",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "providerId",
              "type": "publicKey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "joinedOn",
              "type": "i64"
            },
            {
              "name": "completedJobs",
              "type": "u32"
            },
            {
              "name": "isActive",
              "type": "bool"
            }
          ]
        }
      },
      {
        "name": "Server",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "serverId",
              "type": "u64"
            },
            {
              "name": "memoryGb",
              "type": "u8"
            },
            {
              "name": "numCores",
              "type": "u8"
            },
            {
              "name": "bandwidthGbps",
              "type": "u32"
            },
            {
              "name": "usageFee",
              "type": "u64"
            },
            {
              "name": "isAvailable",
              "type": "bool"
            },
            {
              "name": "isActive",
              "type": "bool"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Taker",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "takerId",
              "type": "publicKey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "fundedJobs",
              "type": "u32"
            },
            {
              "name": "isActive",
              "type": "bool"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "NameTooLong",
        "msg": "The name is too long"
      },
      {
        "code": 6001,
        "name": "InactiveServer",
        "msg": "The server is inactive"
      },
      {
        "code": 6002,
        "name": "ServerAlreadyAvailable",
        "msg": "The server is already available"
      },
      {
        "code": 6003,
        "name": "ServerAlreadyUnavailable",
        "msg": "The server is already unavailable"
      },
      {
        "code": 6004,
        "name": "CannotGetBump",
        "msg": "The server is already listed"
      },
      {
        "code": 6005,
        "name": "InactiveJob",
        "msg": "The job is inactive"
      },
      {
        "code": 6006,
        "name": "JobNotOpen",
        "msg": "The job is already open"
      },
      {
        "code": 6007,
        "name": "DescriptionTooLong",
        "msg": "The storage Id is too long"
      },
      {
        "code": 6008,
        "name": "StorageIdTooLong",
        "msg": "The storage Id is too long"
      },
      {
        "code": 6009,
        "name": "JobAlreadyCompleted",
        "msg": "The job is already completed"
      },
      {
        "code": 6010,
        "name": "JobNotCompleted",
        "msg": "The job is not completed"
      },
      {
        "code": 6011,
        "name": "Unauthorized",
        "msg": "Unauthorized"
      },
      {
        "code": 6012,
        "name": "JobAlreadyAssigned",
        "msg": "The job is already assigned"
      }
    ],
    "metadata": {
      "address": "bipJ9KDH5c6hmU9HKQCGq7ejbWTwzhoczhyTkRcWjXr"
    }
  }


export const IDL: Aristotle = {
    "version": "0.1.0",
    "name": "aristotle",
    "instructions": [
      {
        "name": "createProvider",
        "accounts": [
          {
            "name": "provider",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "name": "createTaker",
        "accounts": [
          {
            "name": "taker",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "name",
            "type": "string"
          }
        ]
      },
      {
        "name": "listServer",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "serverId",
            "type": "u64"
          },
          {
            "name": "memoryGb",
            "type": "u8"
          },
          {
            "name": "numCores",
            "type": "u8"
          },
          {
            "name": "bandwidthGbps",
            "type": "u32"
          },
          {
            "name": "usageFee",
            "type": "u64"
          }
        ]
      },
      {
        "name": "delistServer",
        "accounts": [
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "markServerAvailable",
        "accounts": [
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "isAvailable",
            "type": "bool"
          }
        ]
      },
      {
        "name": "createJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "jobId",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "storageId",
            "type": "string"
          },
          {
            "name": "reqMemory",
            "type": "u32"
          },
          {
            "name": "reqCores",
            "type": "u8"
          },
          {
            "name": "reqBandwidth",
            "type": "u32"
          },
          {
            "name": "reqServerTime",
            "type": "u32"
          }
        ]
      },
      {
        "name": "cancelJob",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "assignJob",
        "accounts": [
          {
            "name": "takerAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "server",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "markJobAbandoned",
        "accounts": [
          {
            "name": "takerAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "markJobCompleted",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "resultStorageId",
            "type": "string"
          }
        ]
      },
      {
        "name": "reportJobIllDefined",
        "accounts": [
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "verifyCompletedJob",
        "accounts": [
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "providerReceiveAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "provider",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "rejectCompletedJob",
        "accounts": [
          {
            "name": "takerAta",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "takerToken",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "auth",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "vault",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "escrow",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "associatedTokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "job",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "taker",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "Escrow",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "serverUser",
              "type": "publicKey"
            },
            {
              "name": "serverUserToken",
              "type": "publicKey"
            },
            {
              "name": "usageFee",
              "type": "u64"
            },
            {
              "name": "seed",
              "type": "u64"
            },
            {
              "name": "authBump",
              "type": "u8"
            },
            {
              "name": "vaultBump",
              "type": "u8"
            },
            {
              "name": "escrowBump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Job",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "jobId",
              "type": "u64"
            },
            {
              "name": "addedBy",
              "type": "publicKey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            },
            {
              "name": "storageId",
              "type": "string"
            },
            {
              "name": "reqMemory",
              "type": "u32"
            },
            {
              "name": "reqCores",
              "type": "u8"
            },
            {
              "name": "reqBandwidth",
              "type": "u32"
            },
            {
              "name": "reqServerTime",
              "type": "u32"
            },
            {
              "name": "assignedTo",
              "type": {
                "option": "publicKey"
              }
            },
            {
              "name": "isOpen",
              "type": "bool"
            },
            {
              "name": "isActive",
              "type": "bool"
            },
            {
              "name": "isCompleted",
              "type": "bool"
            },
            {
              "name": "resultStorageId",
              "type": {
                "option": "string"
              }
            },
            {
              "name": "illDefinedReports",
              "type": "u32"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Provider",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "providerId",
              "type": "publicKey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "joinedOn",
              "type": "i64"
            },
            {
              "name": "completedJobs",
              "type": "u32"
            },
            {
              "name": "isActive",
              "type": "bool"
            }
          ]
        }
      },
      {
        "name": "Server",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "serverId",
              "type": "u64"
            },
            {
              "name": "memoryGb",
              "type": "u8"
            },
            {
              "name": "numCores",
              "type": "u8"
            },
            {
              "name": "bandwidthGbps",
              "type": "u32"
            },
            {
              "name": "usageFee",
              "type": "u64"
            },
            {
              "name": "isAvailable",
              "type": "bool"
            },
            {
              "name": "isActive",
              "type": "bool"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "Taker",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "takerId",
              "type": "publicKey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "fundedJobs",
              "type": "u32"
            },
            {
              "name": "isActive",
              "type": "bool"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "NameTooLong",
        "msg": "The name is too long"
      },
      {
        "code": 6001,
        "name": "InactiveServer",
        "msg": "The server is inactive"
      },
      {
        "code": 6002,
        "name": "ServerAlreadyAvailable",
        "msg": "The server is already available"
      },
      {
        "code": 6003,
        "name": "ServerAlreadyUnavailable",
        "msg": "The server is already unavailable"
      },
      {
        "code": 6004,
        "name": "CannotGetBump",
        "msg": "The server is already listed"
      },
      {
        "code": 6005,
        "name": "InactiveJob",
        "msg": "The job is inactive"
      },
      {
        "code": 6006,
        "name": "JobNotOpen",
        "msg": "The job is already open"
      },
      {
        "code": 6007,
        "name": "DescriptionTooLong",
        "msg": "The storage Id is too long"
      },
      {
        "code": 6008,
        "name": "StorageIdTooLong",
        "msg": "The storage Id is too long"
      },
      {
        "code": 6009,
        "name": "JobAlreadyCompleted",
        "msg": "The job is already completed"
      },
      {
        "code": 6010,
        "name": "JobNotCompleted",
        "msg": "The job is not completed"
      },
      {
        "code": 6011,
        "name": "Unauthorized",
        "msg": "Unauthorized"
      },
      {
        "code": 6012,
        "name": "JobAlreadyAssigned",
        "msg": "The job is already assigned"
      }
    ],
    "metadata": {
      "address": "bipJ9KDH5c6hmU9HKQCGq7ejbWTwzhoczhyTkRcWjXr"
    }
  }