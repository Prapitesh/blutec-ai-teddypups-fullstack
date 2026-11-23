package ai.blutec.puppies.dto;

import jakarta.validation.constraints.*;

public record EnquiryRequest(
    @NotBlank @Size(min=2, max=80) String name,
    @NotBlank @Pattern(regexp="^[+0-9()\\-\\s]{7,32}$", message="Enter a valid phone number") String phone,
    @Email @Size(max=160) String email,
    @Size(max=80) String area,
    @Size(max=120) String puppySlug,
    @Size(max=3000) String message,
    @Size(max=120) String website
) {}
