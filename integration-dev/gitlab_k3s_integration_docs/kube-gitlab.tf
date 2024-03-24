terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
    gitlab = {
      source = "gitlabhq/gitlab"
      version = "~> 3.0"
    }  
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "<= 2.0.0"
    }
    rancher2 = {
      source = "rancher/rancher2"
      version = ">= 1.10.0" 
  #access_key = "" //
  #secret_key = ""
    }
    local = {
      source = "hashicorp/local"
    }
  }
}
#
provider "gitlab" {
  #token = var.gitlab_token
  base_url = "https://gitlab.nioyatech.com/"
}

# Configure the AWS Provider.
provider "aws" {
  region = "us-east-1"
  #access_key = var.access_key
  #secret_key = var.secret_key
}

terraform {
  backend "s3" {
    bucket = "projectx-terraform-backend-orlando"
    key = "projectx1/dev-projectx1-nioyatech1/remote-backend.tfstate-gitlabk8s"
    region = "us-east-1"
    encrypt = true
  }

}
#data "gitlab_project" "projectx" {
  #id = "{{ci_project_path}}"
#}

#
resource gitlab_project_cluster "k3s" {
  #project                       = data.gitlab_project.projectx.id
  project                       = "251"
  name                          = "cluster"
  #domain                        = "publicip.nip.io"
  enabled                       = true
  kubernetes_api_url            = "https://publ_ip:6443"
  kubernetes_token              = templatefile("./token.txt", { })
  kubernetes_ca_cert            = templatefile("./cert.txt", { })
  #kubernetes_namespace          = "devops-19-dev"
  kubernetes_authorization_type = "rbac"
  environment_scope             = "*"
  #management_project_id         = "19"
  # depends_on = [ time_sleep.wait ]
  
}
