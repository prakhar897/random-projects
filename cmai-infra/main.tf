provider "aws" {
  region = "us-west-2" # Replace with your desired AWS region
}

# Create VPC, subnets, and security groups
module "networking" {
  source = "./modules/networking"
}

# Create ECS cluster
resource "aws_ecs_cluster" "my_cluster" {
  name = "my-cluster"
}

# Create ECR repositories
resource "aws_ecr_repository" "nextjs_repo" {
  name = "nextjs-app"
}

resource "aws_ecr_repository" "nodejs_repo" {
  name = "nodejs-app"
}

# Create ECS task definitions and services
module "nextjs_app" {
  source = "./modules/ecs-app"

  app_name       = "nextjs-app"
  container_name = "nextjs-container"
  container_port = 3000
  ecr_repository = aws_ecr_repository.nextjs_repo.repository_url
  cluster_name   = aws_ecs_cluster.my_cluster.name
  vpc_id         = module.networking.vpc_id
  subnet_ids     = module.networking.private_subnet_ids
  lb_sg_id       = module.networking.lb_sg_id
}

module "nodejs_app" {
  source = "./modules/ecs-app"

  app_name       = "nodejs-app"
  container_name = "nodejs-container"
  container_port = 3000
  ecr_repository = aws_ecr_repository.nodejs_repo.repository_url
  cluster_name   = aws_ecs_cluster.my_cluster.name
  vpc_id         = module.networking.vpc_id
  subnet_ids     = module.networking.private_subnet_ids
  lb_sg_id       = module.networking.lb_sg_id
}