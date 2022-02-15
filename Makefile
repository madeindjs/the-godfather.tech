VERSION = 0.0.3-alpha
DOCKER_NAME = arousseau/daddy-open-source
DOCKER_TAG = arousseau/daddy-open-source:${VERSION}

build:
	if docker image ls | grep "${DOCKER_NAME}" | grep "${VERSION}";then\
		echo "${DOCKER_TAG} already exists, skip build";\
	else\
		docker build -t "${DOCKER_NAME}" --no-cache . ;\
	fi

publish:
	docker push "${DOCKER_TAG}"

run:
	docker run \
		-e JWT_SECRET=azerty \
		-e DATABASE_USER=daddy \
		-e DATABASE_PASSWORD=password \
		-e DATABASE_HOST=daddy-db \
		-e DATABASE_DB=daddy \
		-p 3000:3000 \
		--name daddy-server \
		--network br-daddy \
		"${DOCKER_NAME}"