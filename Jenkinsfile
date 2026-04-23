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
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "npm install"'  // Use Git Bash
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "npm test"'  // Use Git Bash
            }
        }
        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."'  // Use Git Bash
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"'  // Use Git Bash
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "echo $DOCKER_PASS | docker login -u $DOCKER_USER --passwordstdin"'  // Use Git Bash
                    sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"'  // Use Git Bash
                    sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"'  // Use Git Bash
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying new container...'
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker stop devops-app || true"'  // Use Git Bash
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker rm devops-app || true"'  // Use Git Bash
                sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker run -d --name devops-app -p 3000:3000 ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"'  // Use Git Bash
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
            sh '"C:\\Program Files\\Git\\bin\\bash.exe" -c "docker logout || true"'  // Use Git Bash
        }
    }
}