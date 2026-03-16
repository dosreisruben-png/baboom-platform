variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "secret_names" {
  type        = list(string)
  description = "List of secret names to create in Secrets Manager"
  default     = []
}

resource "aws_secretsmanager_secret" "secrets" {
  for_each = toset(var.secret_names)

  name                    = "/${var.project_name}/${var.environment}/${each.key}"
  recovery_window_in_days = var.environment == "prod" ? 30 : 0

  tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "terraform"
  }
}

output "secret_arns" {
  value = { for k, v in aws_secretsmanager_secret.secrets : k => v.arn }
}
