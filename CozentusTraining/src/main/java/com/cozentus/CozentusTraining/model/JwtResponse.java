package com.cozentus.CozentusTraining.model;

public class JwtResponse {
	private String token;
	private String role;

	public JwtResponse() {
	}

	public JwtResponse(String token, String role) {
		this.token = token;
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "JwtResponse [token=" + token + ", role=" + role + "]";
	}
}
