deploy:
	echo "latest build\n" > current-build.message
	git rev-parse HEAD >> current-build.message
	rm -rf build
	wintersmith build
	rm -rf build/less
	mkdir -p ../collingreen.github.io.deploy
	rm -rf ../collingreen.github.io.deploy/*
	cp -r build/* ../collingreen.github.io.deploy
	-cd ../collingreen.github.io.deploy && git init && git remote add origin git@github.com:collingreen/collingreen.github.io && git pull origin master
	-cd ../collingreen.github.io.deploy && git remote add origin git@github.com:collingreen/collingreen.github.io
	cd ../collingreen.github.io.deploy && git pull origin master
	cd ../collingreen.github.io.deploy && git add . && git commit -F ../collingreen.github.io/current-build.message && git push origin master
	rm current-build.message

.PHONY: deploy
