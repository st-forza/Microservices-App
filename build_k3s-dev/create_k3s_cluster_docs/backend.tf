terraform {
  backend "s3" {
    bucket = "projectx-terraform-backend-kimmigs"
    key = "projectx/dev-projectx-nioyatech/remote-backend.tfstate-k3s-kimmigs"
    region = "us-east-1"
    encrypt = true
  }

}
