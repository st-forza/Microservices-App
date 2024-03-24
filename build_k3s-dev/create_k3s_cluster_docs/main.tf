terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.59.0"
    }
  }
}
# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}


resource "aws_instance" "master" {
  ami = "ami-044cbbc85e14f16bc"
  #key_name               = "nioyatech"
  key_name               = module.ssh_key_pair.key_name
  vpc_security_group_ids = [aws_security_group.k3s_server.id]
  instance_type          = "t3a.medium"
  user_data = base64encode(templatefile("${path.module}/server-userdata.tmpl", {
    token = random_password.k3s_cluster_secret.result,
  }))

  tags = {
    Name = "k3sServer-kimmigs"
    env  = "dev"
  }
}

resource "aws_instance" "worker" {
  ami   = "ami-044cbbc85e14f16bc"
  count = 2
  #key_name               = "nioyatech"
  key_name               = module.ssh_key_pair.key_name
  vpc_security_group_ids = [aws_security_group.k3s_agent.id]
  instance_type          = "t3a.small"
  user_data = base64encode(templatefile("${path.module}/agent-userdata.tmpl", {
    host  = aws_instance.master.private_ip,
    token = random_password.k3s_cluster_secret.result
  }))
  tags = {
    Name = "k3sWorker-kimmigs"
  }
}

module "ssh_key_pair" {
  source                = "cloudposse/key-pair/aws"
  namespace             = "k"
  stage                 = "i"
  name                  = "m"
  ssh_public_key_path   = "./pem_key"
  generate_ssh_key      = "true"
  private_key_extension = ".pem"
  public_key_extension  = ".pub"
}
