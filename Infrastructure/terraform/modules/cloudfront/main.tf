
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "frontend-oac-for-${var.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"

}

resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
  aliases = [var.alias_name]

  default_root_object = var.default_root_object

  origin {
    domain_name = var.bucket_domain_name
    origin_id   = var.bucket_name

    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = var.bucket_name
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/${var.default_root_object}"
  }


  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/${var.default_root_object}"
  }

  price_class = var.price_class

  viewer_certificate {


    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"


  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }


}
