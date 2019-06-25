#!/usr/bin/groovy

echo ("envname=${params.ENV}")
podTemplate(label: 'jenkins-pipeline', containers: [
    containerTemplate(name: 'jnlp', image: 'fdawsdevus/jnlp-docker:2.0'),
    containerTemplate(name: 'kubectl', image: 'fdawsdevus/k8s-kubectl:latest', command: 'cat', ttyEnabled: true)
],
volumes:[
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
]){

  node ('jenkins-pipeline') {

    def pwd = pwd()
	def appName = 'CamelCaseDomain'
	def repoName = 'fdawsdevus'
  
	def imageTag = "${repoName}/${appName}:0.1.${env.BUILD_NUMBER}".toLowerCase()

    checkout scm

    // read in required jenkins workflow config values
	stage('Build') {
		withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
		
			sh("docker login --username=$USERNAME --password=$PASSWORD")
                        sh("docker version")
			sh("docker build -f Dockerfile -t ${imageTag} .")
			sh("docker push ${imageTag}")
	    }
	}
	
  }
}
