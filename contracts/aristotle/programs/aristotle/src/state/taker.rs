use anchor_lang::prelude::*;
use crate::errors::DefinedError;

#[account]
pub struct Taker {
    pub taker_id: Pubkey,
    pub name: String,   // allow 20 characters in name
    pub funded_jobs: u32,
    pub is_active: bool
}

impl Taker {
    pub const MAXIMUM_SIZE: usize = 32 + 24 + 4 + 1;
    
    pub fn create(&mut self, taker_id: Pubkey, name: String) -> Result<()> {
        require!(name.len() <= 20, DefinedError::NameTooLong);

        self.taker_id = taker_id;
        self.name = name;
        self.funded_jobs = 0;
        self.is_active = true;
        Ok(())
    }

    pub fn increment_funded_jobs(&mut self) -> Result<()> {
        self.funded_jobs += 1;
        Ok(())
    }
}