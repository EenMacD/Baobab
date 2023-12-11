package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Use http.HandleFunc for specific route
	http.HandleFunc("/api/message", handleMessageRequest)

	// Serve static files (assuming your Next.js build is in a folder named "build")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("build/static"))))
	http.Handle("/", http.FileServer(http.Dir("build")))

	// Start the server
	port := 8080
	fmt.Printf("Server listening on :%d...\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		fmt.Printf("Error starting the server: %v\n", err)
	}
}

func handleMessageRequest(w http.ResponseWriter, r *http.Request) {
	// Your API logic here
	fmt.Fprintf(w, "Hello from Go backend!")
}
