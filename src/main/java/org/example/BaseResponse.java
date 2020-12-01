package org.example;

public class BaseResponse<T> {
    private final Iterable<T> data;
    private final Integer status;

    public BaseResponse(Iterable<T> data, Integer status) {
        this.data = data;
        this.status = status;
    }

    public Iterable<T> getData() {
        return data;
    }

    public Integer getStatus() {
        return status;
    }
}
