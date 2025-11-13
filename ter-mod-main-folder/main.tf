module "project1_website" {
  source      = "./modules/s3"
  bucket_name = "project1.printoportfolio.xyz"
}

# S3 Route53 record removed (not needed)
# module "route53_project1" {
#   source      = "./modules/route53"
#   zone_id     = "Z06058821CMXUTZ3L7MQ6"
#   record_name = "project1.printoportfolio.xyz"
#   s3_endpoint = module.project1_website.website_endpoint
# }

module "acm_project1" {
  source      = "./modules/acm"
  domain_name = "project1.printoportfolio.xyz"
  zone_id     = "Z06058821CMXUTZ3L7MQ6"
}

# ENABLE CLOUD FRONT MODULE
module "cloudfront_project1" {
  source              = "./modules/cloudfront"
  domain_name         = "project1.printoportfolio.xyz"
  acm_certificate_arn = module.acm_project1.certificate_arn
  s3_website_endpoint = module.project1_website.website_endpoint
  zone_id             = "Z06058821CMXUTZ3L7MQ6"
}

module "dynamodb_visitors" {
  source = "./modules/dynamodb"
}

module "lambda_project1" {
  source       = "./modules/lambda"
  dynamodb_arn = module.dynamodb_visitors.table_arn
}

module "api_project1" {
  source      = "./modules/apigateway"
  lambda_arn  = module.lambda_project1.lambda_arn
  lambda_name = module.lambda_project1.lambda_name
}
