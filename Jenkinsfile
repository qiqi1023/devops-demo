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
                dir('C:/ProgramData/Jenkins/.jenkins/workspace/devops-demo-pipeline') {
                    // Using 'bat' for Windows instead of 'sh'
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running automated tests...'
                dir('C:/ProgramData/Jenkins/.jenkins/workspace/devops-demo-pipeline') {
                    // Using 'bat' for Windows instead of 'sh'
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                bat "docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                bat "docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    bat "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying new container...'
                bat 'docker stop devops-demo || true'
                bat 'docker rm devops-demo || true'
                bat "docker run -d --name devops-demo -p 3000:3000 ${DOCKERHUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
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
            bat 'docker logout || true'
        }
    }
}