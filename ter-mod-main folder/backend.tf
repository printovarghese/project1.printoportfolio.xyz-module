terraform {
  backend "s3" {
    bucket         = "terraform-backend-printoportfolio"
    key            = "global/s3/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
