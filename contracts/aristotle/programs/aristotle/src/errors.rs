use anchor_lang::{error_code, error::Error};

#[error_code]
pub enum DefinedError {
    #[msg("The name is too long")]
    NameTooLong,

    #[msg("The server is inactive")]
    InactiveServer,

    #[msg("The server is already available")]
    ServerAlreadyAvailable,

    #[msg("The server is already unavailable")]
    ServerAlreadyUnavailable,

    #[msg("The server is already listed")]
    CannotGetBump,

    #[msg("The job is inactive")]
    InactiveJob,

    #[msg("The job is already open")]
    JobNotOpen,

    #[msg("The storage Id is too long")]
    DescriptionTooLong,

    #[msg("The storage Id is too long")]
    StorageIdTooLong,

    #[msg("The job is already completed")]
    JobAlreadyCompleted,

    #[msg("The job is not completed")]
    JobNotCompleted,

    #[msg("Unauthorized")]
    Unauthorized,

    #[msg("The job is already assigned")]
    JobAlreadyAssigned
}