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
                // Use git.exe from Git for Windows
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "npm install"'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                // Use git.exe from Git for Windows
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "npm test"'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}" 
                // Use git.exe from Git for Windows
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."'
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    // Use git.exe for Docker login and push
                    sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "echo $DOCKER_PASS | docker login -u $DOCKER_USER --passwordstdin"'
                    sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"'
                    sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying new container...'
                // Use git.exe from Git for Windows
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker stop devops-app || true"'
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker rm devops-app || true"'
                sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker run -d --name devops-app -p 3000:3000 ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"'
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
            // Logout from Docker
            sh '"C:\\Program Files\\Git\\bin\\git.exe" -c "docker logout || true"'
        }
    }
}