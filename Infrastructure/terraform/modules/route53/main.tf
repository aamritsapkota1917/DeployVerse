resource "aws_route53_record" "alias" {
  count   = var.use_alias ? 1 : 0
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.alias_name
    zone_id                = var.alias_zone_id
    evaluate_target_health = var.evaluate_target_health
  }
}

resource "aws_route53_record" "standard" {
  count   = var.use_alias ? 0 : 1
  zone_id = var.hosted_zone_id
  name    = var.domain_name
  type    = var.record_type # "A" or "CNAME"
  ttl     = var.ttl

  records = var.records
}
