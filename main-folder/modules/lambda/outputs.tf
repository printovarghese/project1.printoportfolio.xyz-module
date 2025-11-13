output "lambda_arn" {
  value = aws_lambda_function.visitor_counter.arn
}

output "lambda_name" {
  value = aws_lambda_function.visitor_counter.function_name
}
