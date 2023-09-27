use anchor_lang::{prelude::*, accounts::signer};
use crate::errors::DefinedError;

#[account]
pub struct Job {
    pub job_id: u64,
    pub added_by: Pubkey,
    pub name: String,   // allow 20 characters in name
    pub description: String,    // allow 50 characters
    pub storage_id: String, // allow 100 characters
    pub req_memory: u32,
    pub req_cores: u8,
    pub req_bandwidth: u32,
    pub req_server_time: u32,
    pub assigned_to: Option<Pubkey>,
    pub is_open: bool,
    pub is_active: bool,
    pub is_completed: bool,
    pub result_storage_id: Option<String>, // allow 100 characters
    pub ill_defined_reports: u32,
    pub bump: u8
}

impl Job {
    pub const MAXIMUM_SIZE: usize = 8 + 32 + 24 + 54 + 104 + 4 + 1 + 4 + 4 + 32 + 1 + 1 + 1 + 104 + 4 + 1;

    pub fn create(&mut self, job_id: u64, added_by: Pubkey, name: String, description: String, storage_id: String, req_memory: u32, req_cores: u8, req_bandwidth: u32, req_server_time: u32, bump: u8) -> Result<()> {
        require!(name.len() <= 20, DefinedError::NameTooLong);
        require!(description.len() <= 50, DefinedError::DescriptionTooLong);
        require!(storage_id.len() <= 100, DefinedError::StorageIdTooLong);
        self.job_id = job_id;
        self.added_by = added_by;
        self.name = name;
        self.description = description;
        self.storage_id = storage_id;
        self.req_memory = req_memory;
        self.req_cores = req_cores;
        self.req_bandwidth = req_bandwidth;
        self.req_server_time = req_server_time;
        self.assigned_to = None;
        self.is_open = true;
        self.is_active = true;
        self.is_completed = false;
        self.result_storage_id = None;
        self.ill_defined_reports = 0;
        self.bump = bump;
        Ok(())
    }

    pub fn cancel(&mut self) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveJob);
        require!(self.assigned_to.is_none(), DefinedError::JobAlreadyAssigned);
        self.is_active = false;
        Ok(())
    }

    pub fn assign(&mut self, provider_id: Pubkey) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveJob);
        require!(self.is_open, DefinedError::JobNotOpen);
        self.assigned_to = Some(provider_id);
        self.is_open = false;
        Ok(())
    }

    pub fn report(&mut self, signer_key: Pubkey) -> Result<()> {
        let are_equal = self.assigned_to.map_or(false, |assigned_key| assigned_key == signer_key);
        require!(are_equal, DefinedError::Unauthorized);
        require!(self.is_active, DefinedError::InactiveJob);
        self.ill_defined_reports += 1;
        Ok(())
    }

    pub fn abandon(&mut self, signer_key: Pubkey) -> Result<()> {
        let are_equal = self.assigned_to.map_or(false, |assigned_key| assigned_key == signer_key);
        require!(are_equal, DefinedError::Unauthorized);
        require!(self.is_active, DefinedError::InactiveJob);
        self.assigned_to = None;
        self.is_open = true;
        Ok(())
    }

    pub fn complete(&mut self, result_storage_id: String, signer_key: Pubkey) -> Result<()> {
        let are_equal = self.assigned_to.map_or(false, |assigned_key| assigned_key == signer_key);
        require!(are_equal, DefinedError::Unauthorized);
        require!(self.is_active, DefinedError::InactiveJob);
        require!(!self.is_completed, DefinedError::JobAlreadyCompleted);
        require!(result_storage_id.len() <= 100, DefinedError::StorageIdTooLong);
        self.is_completed = true;
        self.result_storage_id = Some(result_storage_id);
        Ok(())
    }

    pub fn verify_completed_job(&mut self) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveJob);
        require!(self.is_completed, DefinedError::JobNotCompleted);
        self.is_active = false;
        Ok(())
    }

    pub fn reject_completed_job(&mut self) -> Result<()> {
        require!(self.is_active, DefinedError::InactiveJob);
        require!(self.is_completed, DefinedError::JobNotCompleted);
        self.is_completed = false;
        self.result_storage_id = None;
        self.assigned_to = None;
        self.is_open = true;
        Ok(())
    }
}