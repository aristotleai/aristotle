use anchor_lang::prelude::*;
use crate::errors::DefinedError;

#[account]
pub struct Provider {
    pub provider_id: Pubkey,
    pub name: String,   // allow 20 characters in name
    pub joined_on: i64,
    pub completed_jobs: u32,
    pub is_active: bool
}

impl Provider{
    pub const MAXIMUM_SIZE: usize = 32 + 24 + 64 + 4 + 1;
    
    pub fn create(&mut self, provider_id: Pubkey, name: String) -> Result<()> {
        require!(name.len() <= 20, DefinedError::NameTooLong);
        let clock = Clock::get()?;
        let current_timestamp = clock.unix_timestamp;

        self.provider_id = provider_id;
        self.name = name;
        self.joined_on = current_timestamp;
        self.completed_jobs = 0;
        self.is_active = true;
        Ok(())
    }

    pub fn increment_completed_jobs(&mut self) -> Result<()> {
        self.completed_jobs += 1;
        Ok(())
    }
}