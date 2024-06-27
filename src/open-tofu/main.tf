#### Variables

variable "region" {
    type = string
    default = "us-east-1"
}

variable "github_username" {
    type = string
}

variable "opml_title" {
    type = string
    default = "github-stars.opml"
}

variable "opml_owner_name" {
    type = string
}

variable "opml_owner_email" {
    type = string
}

#### Provider

provider "aws" {
    region = var.region
}

#### Resources

data "aws_iam_policy_document" "assume_role" {
    statement {
        effect = "Allow"

        principals {
            type        = "Service"
            identifiers = ["lambda.amazonaws.com"]
        }

        actions = ["sts:AssumeRole"]
    }
}

resource "aws_iam_role" "iam_for_lambda" {
    name               = "iam_for_lambda"
    assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "archive_file" "lambda" {
    type        = "zip"
    source_dir = "../lambda"
    output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "opml_lambda" {
    # If the file is not in the current working directory you will need to include a
    # path.module in the filename.
    filename      = "lambda_function_payload.zip"
    function_name = "generate_opml_file"
    role          = aws_iam_role.iam_for_lambda.arn
    handler       = "lambda.handler"

    source_code_hash = data.archive_file.lambda.output_base64sha256

    runtime = "nodejs18.x"

    environment {
        variables = {
            github_username = var.github_username,
            opml_title = var.opml_title,
            opml_owner_name = var.opml_owner_name,
            opml_owner_email = var.opml_owner_email
        }
    }
}

resource "aws_lambda_function_url" "opml_lambda_function_url" {
    function_name      = aws_lambda_function.opml_lambda.function_name
    authorization_type = "NONE"
}