class PaginationError extends Error {}
class GetAllPoliciesError extends Error {}
class ExternalServiceError extends Error {}
class ClientNotFoundError extends Error {}
class PolicyNotFoundError extends Error {}
class NotRequiredParamError extends Error {}
class UnauthorizedError extends Error {}

module.exports = {
  PaginationError,
  GetAllPoliciesError,
  ExternalServiceError,
  ClientNotFoundError,
  PolicyNotFoundError,
  NotRequiredParamError,
  UnauthorizedError
}