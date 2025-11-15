variable "use_alias" {
  description = "Whether to create an alias record"
  type        = bool
}

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID"
  type        = string
}

variable "domain_name" {
  description = "Domain name to create"
  type        = string
}

variable "alias_name" {
  description = "Alias target domain name "
  type        = string
  default     = ""
}

variable "alias_zone_id" {
  description = "Alias target hosted zone ID"
  type        = string
  default     = ""
}

variable "evaluate_target_health" {
  description = "Whether to evaluate the health of the alias target"
  type        = bool
  default     = false
}

variable "record_type" {
  description = "Record type (A or CNAME)"
  type        = string
  default     = "CNAME"
}

variable "ttl" {
  description = "TTL for standard records"
  type        = number
  default     = 300
}

variable "records" {
  description = "List of IPs or CNAME targets"
  type        = list(string)
  default     = []
}
