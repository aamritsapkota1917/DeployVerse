variable "Name" {
  type = string
}

variable "Creator" {
  type = string
}

variable "extra_tags" {
  type    = map(string)
  default = {}
}

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "subnet_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "key_name" {
  type = string
}


