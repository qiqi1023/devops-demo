pipeline {
    agent any
    environment {
        DOCKERHUB_USER = 'qiqi1023'
        IMAGE_NAME = 'devops-demo'
        IMAGE_TAG = "1.0.0"
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository from GitHub...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                // Use PowerShell instead of bash
                powershell 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                // Use PowerShell instead of bash
                powershell 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                // Use PowerShell instead of bash
                powershell "docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                powershell "docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    powershell "echo $DOCKER_PASS | docker login -u $DOCKER_USER --passwordstdin"
                    powershell "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    powershell "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying new container...'
                powershell "docker stop devops-app || true"
                powershell "docker rm devops-app || true"
                powershell "docker run -d --name devops-app -p 3000:3000 ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded! Application deployed successfully.'
        }
        failure {
            echo 'Pipeline FAILED. Check the logs for details.'
        }
        always {
            powershell "docker logout || true"
        }
    }
}