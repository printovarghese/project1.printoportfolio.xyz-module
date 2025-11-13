output "record_fqdn" {
  value = aws_route53_record.s3_alias.fqdn
}
