variable "bucket_name" {
  type        = string
  description = "Name of the S3 bucket"
}

variable "region" {
  type        = string
  description = "AWS Region"
}

variable "alias_name" {
  type        = string
  description = "Custom domain name for CloudFront"
}

variable "acm_certificate_arn" {
  type        = string
  description = "ARN of the ACM certificate "
}

variable "price_class" {
  type        = string
  description = "CloudFront price class"
  default     = "PriceClass_100"
}

variable "Creator" {
  type        = string
  description = "Tag Creator name"
}

variable "extra_tags" {
  type        = map(string)
  description = "Extra tags to apply"
  default     = {}
}


variable "bucket_domain_name" {
  type        = string
  description = "Domain name of the S3 bucket"
}

variable "default_root_object" {
  type        = string
  description = "Default root object"

}
