use anchor_lang::prelude::*;
use crate::errors::DefinedError;

#[account]
pub struct Server {
    pub server_id: u64,
    pub memory_gb: u8,
    pub num_cores: u8,
    pub bandwidth_gbps: u32,
    pub usage_fee: u64,
    pub is_available: bool,
    pub is_active: bool,
    pub bump: u8
}

impl Server {
    pub const MAXIMUM_SIZE: usize = 8 + 1 + 1 + 4 + 8 + 1 + 1 + 1;

    pub fn list(&mut self, server_id: u64, memory_gb: u8, num_cores: u8, bandwidth_gbps: u32, usage_fee: u64, bump: u8) -> Result<()> {
        self.server_id = server_id;
        self.memory_gb = memory_gb;
        self.num_cores = num_cores;
        self.bandwidth_gbps = bandwidth_gbps;
        self.usage_fee = usage_fee;
        self.is_available = true;
        self.is_active = true;
        self.bump = bump;
        Ok(())
    }

    pub fn delist(&mut self) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveServer);
        self.is_active = false;
        Ok(())
    }

    pub fn mark_available(&mut self) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveServer);
        require!(!self.is_available, DefinedError::ServerAlreadyAvailable);
        self.is_available = true;
        Ok(())
    }

    pub fn mark_unavailable(&mut self) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveServer);
        require!(self.is_available, DefinedError::ServerAlreadyUnavailable);
        self.is_available = false;
        Ok(())
    }
}