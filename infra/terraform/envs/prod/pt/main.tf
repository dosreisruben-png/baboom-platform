terraform {
  required_version = ">= 1.7.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "platform-tfstate-pt"
    key            = "prod/pt/terraform.tfstate"
    region         = "eu-south-2"
    dynamodb_table = "platform-tfstate-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = "eu-south-2"

  default_tags {
    tags = {
      Environment = "prod"
      Platform    = "pt"
      ManagedBy   = "terraform"
    }
  }
}

module "networking" {
  source       = "../../../modules/networking"
  project_name = "platform-pt"
  environment  = "prod"
  region       = "eu-south-2"
}

module "secrets" {
  source       = "../../../modules/secrets"
  project_name = "platform-pt"
  environment  = "prod"
  secret_names = []
}
