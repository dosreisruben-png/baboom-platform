terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "platform-tfstate-sa"
    key            = "prod/sa/terraform.tfstate"
    region         = "af-south-1"
    dynamodb_table = "platform-tfstate-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = "af-south-1"

  default_tags {
    tags = {
      Environment = "prod"
      Platform    = "sa"
      ManagedBy   = "terraform"
    }
  }
}

module "networking" {
  source       = "../../../modules/networking"
  project_name = "platform-sa"
  environment  = "prod"
  region       = "af-south-1"
}

module "secrets" {
  source       = "../../../modules/secrets"
  project_name = "platform-sa"
  environment  = "prod"
  secret_names = []
}
