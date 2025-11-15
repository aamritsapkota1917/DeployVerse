data "aws_route53_zone" "hosted_zone" {
  name = var.hosted_zone_name
}

data "aws_acm_certificate" "frontend_cert" {
  domain      = "blog.deployverse.dev"
  statuses    = ["ISSUED"]
  most_recent = true
}


module "vpc" {
  source            = "./modules/vpc"
  cidr_block        = var.cidr_block
  subnet_cidr_block = var.subnet_cidr_block

}


module "ec2" {
  source        = "./modules/ec2"
  Name          = var.project
  Creator       = var.Creator
  ami_id        = var.ami_id
  instance_type = "t2.micro"
  subnet_id     = module.vpc.subnet_id
  vpc_id        = module.vpc.vpc_id
  key_name      = var.key_name
domain_mail         = var.domain_mail
  backend_domain_name = var.backend_domain_name
}



module "s3" {
  source             = "./modules/s3"
  bucket_name        = var.bucket_name
  cloudfront_cdn_arn = module.cloudfront.cloudfront_cdn_arn


}




module "cloudfront" {
  source              = "./modules/cloudfront"
  bucket_name         = var.bucket_name
  region              = var.region
  default_root_object = "index.html"
  alias_name          = var.frontend_domain_name
  acm_certificate_arn = data.aws_acm_certificate.frontend_cert.arn
  price_class         = var.price_class
  Creator             = var.Creator


  bucket_domain_name = module.s3.bucket_domain_name

}


module "route53_cf" {
  source         = "./modules/route53"
  hosted_zone_id = data.aws_route53_zone.hosted_zone.zone_id
  domain_name    = var.frontend_domain_name

  use_alias              = true
  alias_name             = module.cloudfront.cloudfront_cdn_domain_name
  alias_zone_id          = module.cloudfront.cloudfront_cdn_hosted_zone_id
  evaluate_target_health = false

  record_type = "CNAME"
  ttl         = 300
  records     = []
}

module "route53_ec2" {
  source         = "./modules/route53"
  hosted_zone_id = data.aws_route53_zone.hosted_zone.zone_id
  domain_name    = var.backend_domain_name

  use_alias = false

  evaluate_target_health = false

  record_type = "A"
  records     = [module.ec2.public_ip]
  ttl         = 300

  depends_on = [module.ec2]
}


