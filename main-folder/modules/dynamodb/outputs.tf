output "table_arn" {
  value = aws_dynamodb_table.visitor_count.arn
}

output "table_name" {
  value = aws_dynamodb_table.visitor_count.name
}
