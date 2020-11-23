package org.example;

public class BaseResponse<T> {
    private final Iterable<T> data;
    private final Integer code;

    public BaseResponse(Iterable<T> data, Integer code) {
        this.data = data;
        this.code = code;
    }

    public Iterable<T> getData() {
        return data;
    }

    public Integer getCode() {
        return code;
    }
}
