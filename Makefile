image_name='nodenc'

all: frontend serve

.PHONY: frontend serve

frontend:
	npm run --prefix frontend/ build

clean:
	rm -rf frontend/dist

serve:
	node backend