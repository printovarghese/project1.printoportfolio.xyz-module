resource "aws_route53_record" "s3_alias" {
  zone_id = var.zone_id
  name    = var.record_name
  type    = "A"

  alias {
    name                   = var.s3_endpoint
    zone_id                = "Z11RGJOFQNVJUP"  # S3 website hosting zone ID (ap-south-1)
    evaluate_target_health = false
  }
}
