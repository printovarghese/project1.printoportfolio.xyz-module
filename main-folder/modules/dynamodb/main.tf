resource "aws_dynamodb_table" "visitor_count" {
  name         = "project1_visitors"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name = "project1_visitors"
    Env  = "prod"
  }
}
