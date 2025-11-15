

resource "aws_security_group" "sg" {
  name        = "ec2_sg_${var.Name}"
  description = "Security group for EC2"
  vpc_id      = var.vpc_id


}

resource "aws_vpc_security_group_ingress_rule" "ssh" {
  security_group_id = aws_security_group.sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_ingress_rule" "https" {
  security_group_id = aws_security_group.sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_egress_rule" "all_outbound" {
  security_group_id = aws_security_group.sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # all protocols
}

resource "aws_instance" "my_ec2" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  vpc_security_group_ids      = [aws_security_group.sg.id]
  tags = {
    project = var.Name
  }


  user_data = <<-EOF
          #!/bin/bash

          # Update packages
          yum update -y

          # Install Docker
          yum install -y docker
          systemctl enable docker
          systemctl start docker

          # Add ec2-user to docker group
          usermod -aG docker ec2-user

          # Install Nginx
          yum install -y nginx
          systemctl enable nginx
          systemctl start nginx

          # Nginx reverse proxy
          cat > /etc/nginx/conf.d/deployverse.conf <<NGINXCONF
          server {
              listen 80;
              server_name ${var.backend_domain_name};

              location / {
                  proxy_pass http://127.0.0.1:5000;
                  proxy_http_version 1.1;
                  proxy_set_header Host \$host;
                  proxy_set_header X-Real-IP \$remote_addr;
                  proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
                  proxy_set_header X-Forwarded-Proto \$scheme;
              }
          }
          NGINXCONF

          nginx -t && systemctl reload nginx

          # Install Certbot
          yum install -y certbot python3-certbot-nginx

          # Wait for DNS propagation
          sleep 20

          # Obtain SSL certificate with redirect
          certbot --nginx -d ${var.backend_domain_name} \
            --non-interactive --agree-tos -m ${var.domain_mail} --redirect
          EOF
}
