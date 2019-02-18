class PaginationError extends Error {}
class ExternalServiceError extends Error {}
class UnexpectedError extends Error {}
class ClientNotFoundError extends Error {}
class PolicyNotFoundError extends Error {}
class UnauthorizedError extends Error {}

module.exports = {
  PaginationError,
  ExternalServiceError,
  ClientNotFoundError,
  PolicyNotFoundError,
  UnauthorizedError,
  UnexpectedError
}