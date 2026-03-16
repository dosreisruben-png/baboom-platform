terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Remote state — configure S3 bucket + DynamoDB table before use
  # backend "s3" {
  #   bucket         = "platform-tfstate-pt"
  #   key            = "dev/pt/terraform.tfstate"
  #   region         = "eu-south-2"
  #   dynamodb_table = "platform-tfstate-lock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = "eu-south-2"

  default_tags {
    tags = {
      Environment = "dev"
      Platform    = "pt"
      ManagedBy   = "terraform"
    }
  }
}

module "networking" {
  source       = "../../../modules/networking"
  project_name = "platform-pt"
  environment  = "dev"
  region       = "eu-south-2"
}

module "secrets" {
  source       = "../../../modules/secrets"
  project_name = "platform-pt"
  environment  = "dev"
  # TODO: add secret names once product stack is defined (TRO-2/TRO-5)
  secret_names = []
}
