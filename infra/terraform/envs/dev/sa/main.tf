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
  #   bucket         = "platform-tfstate-sa"
  #   key            = "dev/sa/terraform.tfstate"
  #   region         = "af-south-1"
  #   dynamodb_table = "platform-tfstate-lock"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = "af-south-1"

  default_tags {
    tags = {
      Environment = "dev"
      Platform    = "sa"
      ManagedBy   = "terraform"
    }
  }
}

module "networking" {
  source       = "../../../modules/networking"
  project_name = "platform-sa"
  environment  = "dev"
  region       = "af-south-1"
}

module "secrets" {
  source       = "../../../modules/secrets"
  project_name = "platform-sa"
  environment  = "dev"
  # TODO: add secret names once product stack is defined (TRO-2/TRO-4)
  secret_names = []
}
